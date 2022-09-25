import React, { useEffect, useState } from 'react';
import SelectField from '../common/form/selectField';
import api from '../../api';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
const initialData = { userId: '', content: '' };
const NewComment = () => {
    const [user, setUser] = useState([]);
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const userList = Object.keys(data).map((userName) => ({
                label: data[userName].name,
                value: data[userName]._id
            }));
            setUser(userList);
        });
    }, []);
    const validatorConfig = {
        userId: {
            isRequired: {
                message: 'Обязательно выберите имя пользователя'
            }
        },
        content: {
            isRequired: {
                message: 'Сообщение не может быть пустым'
            }
        }
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    return (
        <div className="col-md-8">
            <div className="card mb-2">
                <div className="card-body">
                    <div>
                        <h2>New comment</h2>
                        <div className="mb-4">
                            <SelectField label='Выберите пользователя'
                                defaultOption='Пользователь...'
                                name='userId' options={user}
                                onChange={handleChange}
                                value={data.userId}
                                error={errors.userId}/>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            ></label>
                            <TextField
                                label='Сообщение...'
                                name = 'content'
                                value = {data.content}
                                onChange = {handleChange}
                                error = {errors.content}>
                            </TextField>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewComment;
