import React, { useEffect, useState } from 'react';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import { validator } from '../../../utils/validator';
import { useAuth } from '../../../hooks/useAuth';
import { useProfessions } from '../../../hooks/useProfession';
import { useQualities } from '../../../hooks/useQuality';
import { useHistory, useParams } from 'react-router-dom';

const EditUserPage = () => {
    const { currentUser, createUser, handleRefresh } = useAuth();
    const { professions } = useProfessions();
    const { qualities } = useQualities();
    const [user, setUser] = useState({});
    const params = useParams();
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        setUser(currentUser);
        professions && qualities && setLoading(false);
    }, []);
    const handleChange = (target) => {
        setUser((prevState) => {
            return { ...prevState, [target.name]: target.value };
        });
    };

    const profList = professions.map((p) => ({
        value: p._id,
        label: p.name
    }));
    const qualList = qualities.map((q) => ({
        value: q._id,
        label: q.name,
        color: q.color
    }));
    const history = useHistory();

    useEffect(() => {
        if (params.userId !== currentUser._id) {
            history.push(`/users/${currentUser._id}/edit`);
        }
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await createUser({
                ...user,
                qualities: user.qualities.map((q) => {
                    if (q.value) {
                        return q.value;
                    } else {
                        return q;
                    }
                })
            });
            await handleRefresh();
        } catch (error) {
            console.log(error);
        }
    };
    const isValid = Object.keys(errors).length === 0;
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
        const errors = validator(currentUser, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [user]);

    return !isLoading
        ? (
            <form onSubmit={handleSubmit}>
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
                                label='Профессия'
                                defaultOption='Choose...'
                                name='profession'
                                options={profList}
                                onChange={handleChange}
                                value={user.profession}
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
                            label='Пол'
                            />
                            <MultiSelectField
                                onChange={handleChange}
                                options={qualList}
                                name='qualities'
                                defaultValue={qualList.filter((q) =>
                                    user.qualities.includes(q.value)
                                )}
                                label='Качества' />
                            <button className='btn btn-primary w-100 mx-auto' disabled={!isValid} type='submit'>Обновить</button>
                        </div>
                    </div>
                </div>
            </form>
        )
        : 'Loading...';
};

export default EditUserPage;
