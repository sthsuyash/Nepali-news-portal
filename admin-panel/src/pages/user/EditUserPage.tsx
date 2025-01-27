import { useParams } from 'react-router-dom';

const EditUserPage = () => {
  const { id } = useParams(); // Access the id from the route

  return (
    <div>
      <h1>Edit User</h1>
      <p>User ID: {id}</p>
    </div>
  );
};

export default EditUserPage;
