const baseRate = 1000

export function companyTotalValue(company) {
    return company.totalshares*baseRate + company.value;
}

export async function getUserWithShares(pb) {
    let user = await pb.collection('users').getOne(pb.authStore.model.id)

    let shares = await pb.collection('shares').getFullList({ expand: 'user', filter: ('user = "' + user.id + '"') })

    user.shares = shares;

    return user;
}

export async function getTotalNumberOfSharesForCompany(pb, company) {

    let shares = await pb.collection('shares').getFullList({ filter: ('company = "' + company.id + '"') })

    let totalAmount = shares.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
    );

    return totalAmount;
}

export async function buyCompanyShare(pb, company) {
    let user = await getUserWithShares(pb)
    let price = company.shareprice;

    let shares = user.shares.filter(x => x.company == company.id);
    let share = shares.length > 0 ? shares[0] : null;

    if (user.cash >= price) {
        await pb.collection('users').update(user.id, { cash: user.cash - price });

        if (share == null) {
            await pb.collection('shares').create( {
                "amount": 1,
                "user": user.id,
                "company": company.id
            });
        } else {
            await pb.collection('shares').update(share.id, {
                "amount": share.amount + 1
            });
        }

    } else {
        throw 'Insufficient Funds'
    }
}

export async function sellCompanyShare(pb, company) {
    let user = await getUserWithShares(pb)
    let price = company.shareprice;

    let shares = user.shares.filter(x => x.company == company.id);
    let share = shares.length > 0 ? shares[0] : null;

    if (share.amount > 0) {
        await pb.collection('users').update(user.id, { cash: user.cash + price });
       
        await pb.collection('shares').update(share.id, {
            "amount": share.amount - 1
        });

    } else {
        throw 'No shares left'
    }
}