const baseRate = 1000

export function companyTotalValue(company) {
    return company.totalshares*baseRate + company.value;
}

export function companySharePrice(company) {
    return companyTotalValue(company) / company.totalshares;
}

export async function buyCompanyShare(pb, company) {
    let user = await pb.collection('users').getOne(pb.authStore.model.id)
    let price = companySharePrice(company);

    let shares = await pb.collection('shares').getFullList({ expand: 'user', filter: ('user = "' + user.id + '" && company = "' + company.id + '"') })

    let share = shares.length > 0 ? shares[0] : null;

    if (user.cash >= price) {
        await pb.collection('users').update(user.id, { cash: user.cash - price });
        await pb.collection('companies').update(company.id, { 
            value: company.value + (price - baseRate),
            totalshares: company.totalshares + 1
        });

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
    let user = pb.authStore.model;
    let price = companySharePrice(company);

    let shares = await pb.collection('shares').getFullList({ expand: 'user', filter: ('user = "' + user.id + '" && company = "' + company.id + '"') })

    let share = shares.length > 0 ? shares[0] : null;

    if (share.amount > 0) {
        await pb.collection('users').update(user.id, { cash: user.cash + price });
        await pb.collection('companies').update(company.id, { 
            value: company.value * (company.totalshares - 1) / company.totalshares,
            totalshares: company.totalshares - 1
        });
       
        await pb.collection('shares').update(share.id, {
            "amount": share.amount - 1
        });

    } else {
        throw 'No shares left'
    }
}