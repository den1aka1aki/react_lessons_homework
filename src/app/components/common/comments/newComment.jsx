import React, { useEffect, useState } from 'react';
import { validator } from '../../../utils/validator';
import PropTypes from 'prop-types';
import TextAreaField from '../form/textAreaField';

const NewComment = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState([]);
    const validatorConfig = {
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
        setData({});
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
                            <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            ></label>
                            <TextAreaField
                                label='Сообщение...'
                                name = 'content'
                                value = {data.content || ''}
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
