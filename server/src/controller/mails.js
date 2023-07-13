import nodemailer from 'nodemailer'

export const alertMail = () =>{
	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'kevin.ossa@utp.edu.co',
			pass: 'tumb4lapu3rt4',
		},
	});

	transport.sendMail({
		from: 'kevin.ossa@utp.edu.co',
		to: 'legogaragestore@gmail.com',
		subject: 'Alerta de Inventario!!!!!',
		text: 'Algunos de los productos están llegando a sus limites de stuck'
	}).then(info => {
		console.log({info});
	}).catch(console.error())
//legogaragestore@gmail.com
}

