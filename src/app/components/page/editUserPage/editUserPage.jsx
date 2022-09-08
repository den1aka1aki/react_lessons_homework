import React, { useEffect, useState } from 'react';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import api from '../../../api';
import { useHistory, useParams } from 'react-router-dom';
import { validator } from '../../../utils/validator';

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    });
    const handleChange = (target) => {
        setData((prevState) => {
            return { ...prevState, [target.name]: target.value };
        });
    };
    const transformData = (data) => {
        return data.map((elem) => ({ label: elem.name, value: elem._id }));
    };
    useEffect(() => {
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        );
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const getProfById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality of qualities) {
                if (elem.value === quality.value) {
                    qualitiesArray.push({
                        _id: quality.value,
                        name: quality.label,
                        color: quality.color
                    });
                    //  console.log(quality.label + quality.value + quality.color);
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users.update(userId, {
            ...data,
            profession: getProfById(profession),
            qualities: getQualities(qualities)
        })
            .then((data) => history.push(`/users/${data._id}`));
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
        },
        profession: {
            isRequired:
                {
                    message: 'Данное поле обязательно для заполнения'
                }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);

    if (data && professions) {
        return (
            <form onSubmit={handleSubmit}>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 shadow p-4'>
                            <TextField
                                label='Имя'
                                name='name'
                                value={data.name}
                                error={errors.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label='Электронная почта'
                                name='email'
                                value={data.email}
                                error={errors.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                label='Профессия'
                                defaultOption='Choose...'
                                name='profession'
                                error={errors.profession}
                                options={professions}
                                onChange={handleChange}
                                value={data.profession}
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
                            value={data.sex}
                            name='sex'
                            onChange={handleChange}
                            label='Пол'
                            />
                            <MultiSelectField
                                onChange={handleChange}
                                options={qualities}
                                defaultValue={data.qualities}
                                name='qualities'
                                label='Качества' />
                            <button className='btn btn-primary w-100 mx-auto' disabled={!isValid} type='submit'>Обновить</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    return 'loading...';
};

export default EditUserPage;
