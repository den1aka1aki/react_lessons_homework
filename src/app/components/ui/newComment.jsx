import React from 'react';
// import SelectField from '../common/form/selectField';

const NewComment = () => {
    return (
        <div className="col-md-8">
            <div className="card mb-2">
                <div className="card-body">
                    <div>
                        <h2>New comment</h2>
                        <div className="mb-4">
                            {/* =====>>>>        <SelectField label={'Выберите пользователя'} />  */}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            >Сообщение</label
                            >
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewComment;
