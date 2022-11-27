import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { getQualities } from '../../store/qualities';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessions } from '../../store/profession';
import { signUp } from '../../store/users';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const professions = useSelector(getProfessions());
    const profList = professions.map(p => ({ label: p.name, value: p._id }));
    const qualities = useSelector(getQualities());
    const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }));
    const [data, setData] = useState({ email: '', password: '', profession: '', sex: 'male', name: '', qualities: [], licence: false });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
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
                }
        },
        name: {
            isRequired:
                {
                    message: 'Имя обязательна для заполнения'
                },
            min:
                {
                    message: 'Имя должен состоять минимум из 3 символов',
                    value: 3
                }
        },
        password: {
            isRequired:
                {
                    message: 'Пароль обязательна для заполнения'
                }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию'
            }
        },
        licence: {
            isRequired: {
                message: 'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
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
    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label };
    //         }
    //     }
    // };
    // const getQualities = (elements) => {
    //     const qualitiesArray = [];
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label,
    //                     color: qualities[quality].color
    //                 });
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data, qualities: data.qualities.map(q => q.value) };
        dispatch(signUp(newData));
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
                label = 'Имя'
                name = 'name'
                value = {data.name}
                onChange = {handleChange}
                error = {errors.name}
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
                name = 'profession'
                options={profList}
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
            label='Выберите ваш пол'
            />
            <MultiSelectField options={qualitiesList} onChange={handleChange} defaultValue = {data.qualities} name='qualities' label='Выберите ваши качества'/>
            <CheckBoxField value={data.licence} onChange={handleChange} name='licence' error={errors.licence}> Подтвердить <a>лицензионное соглашение</a></CheckBoxField>
            <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>Submit</button>
        </form>
    );
};

export default RegisterForm;
