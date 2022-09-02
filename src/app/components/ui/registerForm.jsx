import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';

const RegisterForm = () => {
    const [professions, setProfessions] = useState();
    const [data, setData] = useState({ email: '', password: '', profession: '', sex: 'male' });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired:
                {
                    message: 'Электронная почта обязательна для заполнения'
                },
            isEmail: {
                message: 'Email введен не верно'
            }
        },
        password: {
            isRequired:
                {
                    message: 'Пароль обязательна для заполнения'
                },
            isCapitalSymbol:
                {
                    message: 'Пароль должен содержать хотя бы одну заглавную букву'
                },
            isContainDigit:
                {
                    message: 'Пароль должен сожержать хотя бы одно число'
                },
            min:
                {
                    message: 'Пароль должен состоять минимум из 8 символов',
                    value: 8
                }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию'
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label = 'Электронная почта'
                name = 'email'
                value = {data.email}
                onChange = {handleChange}
                error = {errors.email}
            />
            <TextField
                label = 'Пароль'
                type = 'password'
                name = 'password'
                value = {data.password}
                onChange = {handleChange}
                error = {errors.password}
            />
            <SelectField
                label='Выберите вашу профессию'
                defaultOption='Choose...'
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession} />
            <RadioField options={[
                { name: 'Male', value: 'male' },
                { name: 'Female', value: 'female' },
                { name: 'Other', value: 'other' }]}
            value={data.sex}
            name = 'sex'
            onChange={handleChange}
            />
            <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>Submit</button>
        </form>
    );
};

export default RegisterForm;