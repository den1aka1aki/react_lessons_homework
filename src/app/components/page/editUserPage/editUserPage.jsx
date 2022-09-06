import React, { useEffect, useState } from 'react';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import api from '../../../api';
import { useParams } from 'react-router-dom';

const EditUserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        }, []);
    });
    if (user) {
        return (
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 shadow p-4'>
                        <TextField
                            label='Имя'
                            name='name'
                            value={user.name}
                        />
                        <TextField
                            label='Электронная почта'
                            name='email'
                            value={user.email}
                        />
                        <SelectField
                            label='Выберите вашу профессию'
                            defaultOption='Choose...'
                            name='profession'
                            options={''}
                            onChange={''}
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
                        value={'data.sex'}
                        name='sex'
                        onChange={''}
                        label='Выберите ваш пол'
                        />
                        <MultiSelectField options={''} onChange={''} defaultValue={''} name='qualities'
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
