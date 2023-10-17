import { Member, Person } from "../interfaces/person.interface"
import { User } from "../interfaces/user.interface";
import PersonModel from "../models/person";
import RoleModel from "../models/role";
import UserModel from "../models/user";
import { encrypt } from "../utils/bcrypt.handle";

const createUserByPerson = async ({ email, password, roles, person }: User) => {

    const checkIsPerson = await PersonModel.findOne({ _id: person._id });
    if (!checkIsPerson) return 'Person not exist';

    const checkIsUser = await UserModel.findOne({ email: email, person: person._id });
    if (checkIsUser) return 'User already exist';

    const passwordHash = await encrypt(password);

    if (roles) {
        const foundRoles = await RoleModel.find({ name: { $in: roles } });
        roles = foundRoles.map(role => role._id)
    } else {
        const role = await RoleModel.findOne({ name: 'user' });
        roles = [role!._id]
    }
    const responseUserRegister = await UserModel.create({ email, password: passwordHash, roles, person: person._id });
    return responseUserRegister;
}



const findPerson = async (id: string) => {
    const personFound = await UserModel.findOne({ _id: id }).populate('person');
    if (!personFound) return 'USER_NOT_FOUND';

    return personFound;
}
const findPersons = async () => {
    const personsFound = await UserModel.find().populate('person');
    return personsFound;
}

const updatePerson = async (id: string, memberData: Member) => {


    const newUser = await UserModel.findOneAndUpdate({ _id: id }, {
        email: memberData.email,
        password: memberData.password

    }, { new: true });
    const newPerson = await PersonModel.findOneAndUpdate({ _id: newUser?.person }, {
        name: memberData.name,
        surname: memberData.surname,
        birthday: memberData.birthday,
        type_document: memberData.type_document,
        no_document: memberData.no_document,
        country: memberData.country,
        city: memberData.city,
        phone: memberData.phone,
        img_url: memberData.img_url,
    }, { new: true });

    if (!newUser) return 'USER_NOT_FOUND';
    if (!newPerson) return 'PERSON_NOT_FOUND';
    const response = {
        user: newUser,
        person: newPerson
    }
    return response;
}
const deletePerson = async (idUser: string) => {

    const userFound = await UserModel.findOne({ _id: idUser });
    if (!userFound) return 'USER_NOT_FOUND';
    const countUserByPerson = await UserModel.countDocuments({ person: userFound.person });
    if (countUserByPerson > 1) {
        await UserModel.findOneAndDelete({ _id: idUser });
    } else {
        await UserModel.findOneAndDelete({ _id: idUser });
        await PersonModel.findOneAndDelete({ _id: userFound.person });
    }
    return 'Deleted successful';
}

const createNewMember = async (memberData: Member) => {
    const userExist = await UserModel.findOne({ email: memberData.email });
    const personExist = await PersonModel.findOne({
        $or: [
            { no_document: memberData.no_document },
            { phone: memberData.phone }
        ]
    });

    if (userExist) return 'User already exist';
    if (personExist) return 'Person already exist';

    const newPerson = await PersonModel.create({
        name: memberData.name,
        surname: memberData.surname,
        birthday: memberData.birthday,
        type_document: memberData.type_document,
        no_document: memberData.no_document,
        country: memberData.country,
        city: memberData.city,
        phone: memberData.phone,
        img_url: memberData.img_url,
    });
    const userRol = await RoleModel.findOne({ name: 'user' });
    const passwordHash = await encrypt(memberData.password);
    const newUser = await UserModel.create({
        email: memberData.email,
        password: passwordHash,
        person: newPerson._id,
        roles: [userRol!._id],
    });

    const response = {
        user: newUser,
        person: newPerson
    }
    return response;
}



export { createUserByPerson, findPerson, findPersons, updatePerson, deletePerson, createNewMember };
