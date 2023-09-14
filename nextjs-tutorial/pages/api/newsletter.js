

function handler(req, res){
    if (req.method === 'POST'){
     const userEmail =  req.body.email;

     if (!userEmail || !userEmail.includdes('@')){
        res.status(442).json({ message: 'Invalid email address.' });
        return;
     }
     console.log(userEmail);
    }
}

export default handler;