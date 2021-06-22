const handleSignin = (req,res,db,bcrypt) => {
	db.select('*').from('login')
	.where('email','=',req.body.email)
	.then(data=>{
		const crctPassword = bcrypt.compareSync(req.body.password,data[0].hash);
		if(crctPassword){
			return db.select('*').from('users')
						.where('email','=',req.body.email)
						.then(user=>{
							res.json(user[0]);
						}).catch(err=>res.status(400).json("login error"));
		}	
		else {
			res.status(400).json('Wrong Crendentials');
		}
	}).catch(err=>res.status(400).json("Wrong Crendentials"));
}

module.exports = {
	handleSignin: handleSignin
};