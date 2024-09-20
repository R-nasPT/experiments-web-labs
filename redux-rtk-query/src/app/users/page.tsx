"use client";

import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { useCreateUserMutation, useDeleteUserMutation, useGetUserByIdQuery, useGetUsersQuery, useUpdateUserMutation } from "@/redux/api";
import { addFavorite, removeFavorite, selectFavorites } from "@/redux/slices/favoritesSlice";

export default function UserList() {
  const { data, error, isLoading } = useGetUserByIdQuery(1);

    // Mutations
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
  
    // ตัวอย่างการใช้
    const handleCreateUser = async () => {
      const newUser = { name: 'John', email: 'john@example.com' };
      await createUser(newUser);
    };
  
    const handleUpdateUser = async (id) => {
      const updatedUser = { name: 'John Updated', email: 'john_updated@example.com' };
      await updateUser({ id, ...updatedUser });
    };
  
    const handleDeleteUser = async (id) => {
      await deleteUser(id);
    };

  // --------- slice ----------
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();
  
  const handleAddFavorite = (id: number) => {
    dispatch(addFavorite(id));
  };
  
  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  }; 

  if (isLoading) return <div>กำลังโหลด...</div>;
  if (error) return <div>เกิดข้อผิดพลาด</div>;

  return (
    <>
      <ul>
        {/* {data?.map((user) => (
        <li key={user?.id}>{user?.fname}</li>
        ))} */}
        <li key={data.user?.id}>{data.user?.fname}</li>
      </ul>
      <div>
      <h2>รายการโปรด</h2>

      <ul>
        {favorites.map((id) => (
          <li key={id}>
            รายการ {id}
            <button onClick={() => handleRemoveFavorite(id)}>ลบ</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddFavorite(Math.random())}>เพิ่มรายการสุ่ม</button>
    </div>
    </>
  );
}
