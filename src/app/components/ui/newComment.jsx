import React, { useEffect, useState } from 'react';
import SelectField from '../common/form/selectField';
import api from '../../api';
import { validator } from '../../utils/validator';
import PropTypes from 'prop-types';
import TextAreaField from '../common/form/textAreaField';
const initialData = { userId: '', content: '' };

const NewComment = ({ onSubmit }) => {
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
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <div className="col-md-8">
            <div className="card mb-2">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
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
                            <TextAreaField
                                label='Сообщение...'
                                name = 'content'
                                value = {data.content}
                                onChange = {handleChange}
                                error = {errors.content}>
                            </TextAreaField>
                            <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>Подтвердить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
NewComment.propTypes = {
    onSubmit: PropTypes.func
};

export default NewComment;
