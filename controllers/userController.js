const User = require('./../models/userModel');
const Parner = require('./../models/partnerModel');
const nodemailer = require("nodemailer");


module.exports = {
    userRegister: (async(req,res)=>{
        const {
            email,
            partnerEmail 
        } = req.body
        
        // validate if partner & user is already in relationship 
        const user = await User.findOne({ email:email });
        if(user){
            return res.status(409).send({
                status: 'fail',
                message: 'Your email address is already exist'
            })
        }
        const partner = await User.findOne({ partnerEmail:partnerEmail });
        if(partner){
            return res.status(409).send({
                status: 'fail',
                message: 'Your partner is already in other releationsh'
            })
        }

        // if somebody already invited connction 
        /*const partnerExistCheck = await Parner.findOne({ partnerEmail:partnerEmail });
        if(partnerExistCheck){
            return res.status(409).send({
                status: 'fail',
                message: 'Somebody has already invited your connection'
            })
        }*/ 
        
        // save user if not in relatioship 
        const savedUser = await User.create(req.body); 
        delete savedUser.password;
        if (!savedUser) return res.status(500).send({
            status:'fail',
            message: savedUser
        })
        else{ 
            //save partner invitation
            const partnerInvitation = await Parner.create({
                email: partnerEmail,
                invitedByUser: savedUser._id
            }); 

            return res.status(200).send({
                status:'success',
                message: 'Registered Success',
                data: savedUser
            });
        } 
        // send notification by email or text

        // res.send(req.body)
    }),
    
    userLogin: async(req,res) => {
        const { email } = req.body;
        // check if email is not in pending partner
        const userCheck = await User.findOne({ email:email});
        // const partnerCheck = await Parner.find({ email:email});
        if(!userCheck){
            const partnerCheck = await Parner.findOne({ email:email});
            if(!partnerCheck){
                return res.status(409).send({
                    status:'fail',
                    message: 'Account not assiciated with this email'
                });
            }else{
                return res.status(409).send({
                    status:'fail',
                    message: 'You did not accept your invitation yet'
                });
            }
        }
        else{
            return res.status(200).send({
                status:'success',
                message: 'Login Success',
                data: userCheck
            });
        }
    },

    userProfile: async(req, res) => {
        const query = { _id : req.body.id };
        
        // check if email is exist
        const userCheck = await User.findOne({ _id:_id});
        // const partnerCheck = await Parner.find({ email:email});
        if(!userCheck){
            return res.status(409).send({
                status:'success',
                message: 'Profile',
                data: userCheck
            })
        }
        else{
            return res.status(409).send({
                status:'fail',
                message: 'Account not assiciated with this email'
            });
        }
    }

    

    // sendMail: (req,res)=> {
    //         let name = req.body.name;
    //         let from = req.body.from;
    //         var message = req.body.message;
    //         var to = '*******@gmail.com';
    //         var smtpTransport = nodemailer.createTransport("SMTP",{
    //             service: "Gmail",
    //             auth: {
    //                 user: "******@gmail.com",
    //                 pass: "*****"
    //             }
    //         });
    //         var mailOptions = {
    //             from: from,
    //             to: to, 
    //             subject: name+' | new message !',
    //             text: message
    //         }
    //         smtpTransport.sendMail(mailOptions, function(error, response){
    //             if(error){
    //                 console.log(error);
    //             }else{
    //                 res.redirect('/');
    //             }
    //         });
        
    // }
}