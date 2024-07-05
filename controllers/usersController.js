const Users = require('../model/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    create: async(req, res) => {
        try {

            const { name, lastName, email, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)

            const emailExist = await Users.findOne({ email });
            if (emailExist) return res.status(400).json({ msg: 'Email ja cadastrado'})

            const user = {
                name,
                lastName,
                email,
                password: hashedPassword
            }

            const response = await Users.create(user)
            res.status(201).json({ response, msg: 'Usuário cadastrado com sucesso'})
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Erro ao criar usuário. Tente novamente mais tarde.' });
        }
    },

    getAll: async(req, res) => {
        try {
            const users = await Users.find()

            res.json(users)
        } catch (error) {
            console.log(error)
        }
    },

    getFindId: async(req, res) => {
        try {
            const id = req.params.id
            const user = await Users.findById(id)

            if(!user) return res.status(404).json({msg: 'Usuário não encontrado'}) 

            res.json(user)
        } catch (error) {
            console.log(error)
        }
    },

    deleteUser: async(req, res) => {
        try {
            const id = req.params.id
            const user = await Users.findById(id)

            if(!user) return res.status(404).json({ msg: 'Usuário não encontrado'})

            const deleteUser = await Users.findByIdAndDelete(id)

            res.status(200).json({ deleteUser, msg: 'Usuário deletado'})
        } catch (error) {
            
        }
    },

    updatedUser: async(req, res) => {
        try {
            const { name, lastName, email, password } = req.body
            const id = req.params.id

            const emailExist = await Users.findOne({ email });
            if (emailExist && emailExist._id.toString() !== id) {
                return res.json({ msg: 'Email já existente' });
            }

            const updatedUser = await Users.findByIdAndUpdate(id, {
                name,
                lastName,
                email,
                password
            }, {new: true})

            if(!updatedUser) return res.status(404).json({ msg: 'Usuário não encontrado'})

            res.status(200).json({updatedUser, msg: 'Usuário autualizado com sucesso'})
        } catch (error) {
            console.log(err)
        }
    },

    
    login: async(req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({email})

            if(!user) return res.status(400).json({ msg: 'Usuário não encontrado' })

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) return res.status(401).json({ msg: 'Senha inválida' })

            const token = jwt.sign({ id: user._id }, 'meu_segredo', { expiresIn: '24h' })
            res.json({ token, user: { id: user._id, name: user.name, email: user.email }})
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Erro ao fazer login. Tente novamente mais tarde.'})
        }
    }
}

module.exports = userController