import React, { useEffect, useState } from 'react';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import api from '../../../api';
import { useParams } from 'react-router-dom';
import { validator } from '../../../utils/validator';

const EditUserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setUser((prevState) => {
            return { ...prevState, [target.name]: target.value };
        });
    };
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

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
        name: {
            isRequired:
                {
                    message: 'Данное поле обязательно для заполнения'
                }
        }
    };
    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [user]);

    if (user) {
        return (
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 shadow p-4'>
                        <TextField
                            label='Имя'
                            name='name'
                            value={user.name}
                            error={errors.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label='Электронная почта'
                            name='email'
                            value={user.email}
                            error={errors.email}
                            onChange={handleChange}
                        />
                        <SelectField
                            label='Выберите вашу профессию'
                            defaultOption='Choose...'
                            name='profession'
                            options={''}
                            onChange={handleChange}
                            value={''}
                            error={''}
                        />
                        <RadioField options={[
                            {
                                name: 'Male',
                                value: 'male'
                            },
                            {
                                name: 'Female',
                                value: 'female'
                            },
                            {
                                name: 'Other',
                                value: 'other'
                            }]}
                        value={user.sex}
                        name='sex'
                        onChange={handleChange}
                        label='Выберите ваш пол'
                        />
                        <MultiSelectField options={''} onChange={handleChange} defaultValue={''} name='qualities'
                            label='Выберите ваши качества' />
                        <button className='btn btn-primary w-100 mx-auto' type='submit'>Обновить</button>
                    </div>
                </div>
            </div>
        );
    }
    return 'loading...';
};

export default EditUserPage;
