import React, { useEffect, useState } from 'react';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import { validator } from '../../../utils/validator';
import { useAuth } from '../../../hooks/useAuth';
import { useProfessions } from '../../../hooks/useProfession';
import { useSelector } from 'react-redux';
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities';
import { useHistory } from 'react-router-dom';
//
// const EditUserPage = () => {
//     const { currentUser, createUser, handleRefresh } = useAuth();
//     const { professions } = useProfessions();
//     const [user, setUser] = useState({});
//     const params = useParams();
//     const [errors, setErrors] = useState({});
//     const qualities = useSelector(getQualities());
//     const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
//     useEffect(() => {
//         setUser(currentUser);
//     }, []);
//     const handleChange = (target) => {
//         setUser((prevState) => {
//             return { ...prevState, [target.name]: target.value };
//         });
//     };
//
//     const profList = professions.map((p) => ({
//         value: p._id,
//         label: p.name
//     }));
//     const qualList = qualities.map((q) => ({
//         value: q._id,
//         label: q.name,
//         color: q.color
//     }));
//     const history = useHistory();
//
//     useEffect(() => {
//         if (params.userId !== currentUser._id) {
//             history.push(`/users/${currentUser._id}/edit`);
//         }
//     }, []);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const isValid = validate();
//         if (!isValid) return;
//         try {
//             await createUser({
//                 ...user,
//                 qualities: user.qualities.map((q) => {
//                     if (q.value) {
//                         return q.value;
//                     } else {
//                         return q;
//                     }
//                 })
//             });
//             await handleRefresh();
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     const isValid = Object.keys(errors).length === 0;
//     const validatorConfig = {
//         email: {
//             isRequired:
//                 {
//                     message: 'Электронная почта обязательна для заполнения'
//                 },
//             isEmail: {
//                 message: 'Email введен не верно'
//             }
//         },
//         name: {
//             isRequired:
//                 {
//                     message: 'Данное поле обязательно для заполнения'
//                 }
//         }
//     };
//     const validate = () => {
//         const errors = validator(currentUser, validatorConfig);
//         setErrors(errors);
//         return Object.keys(errors).length === 0;
//     };
//     useEffect(() => {
//         validate();
//     }, [user]);
//
//     return !qualitiesLoading
//         ? (
//             <form onSubmit={handleSubmit}>
//                 <div className='container mt-5'>
//                     <div className='row'>
//                         <div className='col-md-6 offset-md-3 shadow p-4'>
//                             <TextField
//                                 label='Имя'
//                                 name='name'
//                                 value={user.name}
//                                 error={errors.name}
//                                 onChange={handleChange}
//                             />
//                             <TextField
//                                 label='Электронная почта'
//                                 name='email'
//                                 value={user.email}
//                                 error={errors.email}
//                                 onChange={handleChange}
//                             />
//                             <SelectField
//                                 label='Профессия'
//                                 defaultOption='Choose...'
//                                 name='profession'
//                                 options={profList}
//                                 onChange={handleChange}
//                                 value={user.profession}
//                             />
//                             <RadioField options={[
//                                 {
//                                     name: 'Male',
//                                     value: 'male'
//                                 },
//                                 {
//                                     name: 'Female',
//                                     value: 'female'
//                                 },
//                                 {
//                                     name: 'Other',
//                                     value: 'other'
//                                 }]}
//                             value={user.sex}
//                             name='sex'
//                             onChange={handleChange}
//                             label='Пол'
//                             />
//                             <MultiSelectField
//                                 onChange={handleChange}
//                                 options={qualList}
//                                 name='qualities'
//                                 defaultValue={qualList.filter((q) =>
//                                     user.qualities.includes(q.value)
//                                 )}
//                                 label='Качества' />
//                             <button className='btn btn-primary w-100 mx-auto' disabled={!isValid} type='submit'>Обновить</button>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         )
//         : 'Loading...';
// };
//
// export default EditUserPage;

const EditUserPage = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const { currentUser, updateUserData } = useAuth();
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const { professions, isLoading: professionLoading } = useProfessions();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateUserData({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        });

        history.push(`/users/${currentUser._id}`);
    };
    function getQualitiesListByIds (qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    const transformData = (data) => {
        const result = getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
        return result;
    };
    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        },
        name: {
            isRequired: {
                message: 'Введите ваше имя'
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0
                        ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={professionsList}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: 'Male', value: 'male' },
                                        { name: 'Female', value: 'female' },
                                        { name: 'Other', value: 'other' }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    defaultValue={data.qualities}
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                Обновить
                                </button>
                            </form>
                        )
                        : (
                            'Loading...'
                        )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
