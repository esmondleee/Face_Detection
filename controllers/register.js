const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password ) 
    {
        // if any of those above is empty
        res.status(400).json("Incorrect form submission");

    }
    else {
        const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
                //id: (increment)
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users') //trx is an object replacing db so that if anything gone wrong it wont affect db
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    //password: 
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
    
        .catch(err => res.status(400).json('unable to register :('))
    }
}

module.exports = {
    handleRegister: handleRegister
};