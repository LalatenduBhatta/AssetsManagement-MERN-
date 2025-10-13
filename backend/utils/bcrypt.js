import bcrypt from "bcrypt"

const saltRound = 10

export function createHash(plainPassword) {
    return bcrypt.hashSync(plainPassword, saltRound)
}

export function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword)
}