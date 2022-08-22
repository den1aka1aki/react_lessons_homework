// import React, { useState } from "react";
// import api from "../api";
// import 'bootstrap/dist/css/bootstrap.css'
//
//
//
// const UsersList = () => {
//   // const renderPhrase =(number) =>{
//   //   if (number <= 4 && number>1) {
//   //     return  <span className='badge bg-primary p-2 w-25'>{number} человека тусанет с тобой сегодня</span>
//   //
//   //   }
//   //   else if (number === 1){
//   //     return  <span className='badge bg-primary p-2 w-25'>{number} человек тусанет с тобой сегодня</span>
//   //
//   //   }
//   //   else if (number === 0){
//   //     return  <span className='badge bg-danger p-2 w-25'> никто не тусанет с тобой сегодня</span>
//   //   }
//   //   return  <span className='badge bg-primary p-2 w-25'>{number} человек тусанет с тобой сегодня</span>
//   // };
//
//   const [users, setUsers] = useState(api.users.fetchAll());
//   const handleDelete = (id) => {
//     setUsers(prevState => prevState.filter(users=>users._id!==id))
//     console.log(id)
//   };
//
//   return (
//     <>
//       <div className='d-flex flex-column p-2 text-start'>
//       <span > {renderPhrase(users.length)}</span>
//       <table className='table'>
//         <thead >
//           <tr className=''>
//             <th className='' scope="col">Имя</th>
//             <th className='' scope="col">Качества</th>
//             <th className='' scope="col">Профессия</th>
//             <th className='' scope="col">Встретился, раз</th>
//             <th className='' scope="col">Оценка</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id} >
//               <td className='fs-5 w-25'>{user.name}</td>
//               <td className='w-25'>{user.qualities.map((quality,color)=>(
//                 <span className={'badge m-1 bg-' + quality.color}>{quality.name} </span>
//               ))}</td>
//               <td className='w-25'>{user.profession.name}</td>
//               <td className='w-25'>{user.completedMeetings}</td>
//               <td className='w-25'>{user.rate}</td>
//               <td className='w-25'>
//                 <button type='button' className='btn btn-danger' onClick={()=>handleDelete(user._id)}>delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>
//     </>
//   );
// };
//
// export default UsersList;
