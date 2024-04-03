import React, { useEffect, useState } from "react";
import { BsChatText } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../services/Redux/actions";
import Cookies from "js-cookie";
import apiRequest from "../../services/Axios/config";

export default function Tickets() {
  const dispatch = useDispatch();
  const dataUsers = useSelector((state) => state.users);
  const [users, setUsers] = useState({});
  const Token = Cookies.get("Token");
  const [newTickets, setNewTickets] = useState({
    userId: "",
    userRole: "",
    fullName: "",
    adminId: 1,
    tickets: "",
    timeCreated: "",
    answer: null,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (Token && dataUsers.length > 0) {
      const userFind = dataUsers.find((user) => user.email === Token);
      setUsers(userFind);
    }
  }, [Token, dataUsers]);

  useEffect(() => {
    if (users.id && users.role && users.username) {
      setNewTickets((prevState) => ({
        ...prevState,
        userId: users.id,
        userRole: users.role,
        fullName: users.username,
      }));
    }
  }, [users]);

  if (!Token) {
    return <div></div>;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTickets({
      ...newTickets,
      [name]: value,
    });
  };

  const ticketsHandler = async (event) => {
    try {
      if (event.key === "Enter") {
        const updatedUserTickets = {
          ...users,
          tickets: [
            ...users.tickets,
            {
              ...newTickets,
              id: users.tickets.length + 1,
              timeCreated: new Date().toISOString(),
            },
          ],
        };

        await apiRequest.put(`/users/${users.id}`, updatedUserTickets);

        setNewTickets({
          ...newTickets,
          tickets: "",
        });

        setUsers(updatedUserTickets);
      }
    } catch (error) {}
  };

  const [openTickets, setOpenTickets] = useState(false);
  const openTicketsHandler = () => {
    setOpenTickets(!openTickets);
  };

  return (
    <>
      <div className="fixed bottom-5 left-5 flex items-center justify-center rounded-full bg-sky-500 h-[60px] w-[60px]  text-white z-10">
        <button className="text-[28px]" onClick={openTicketsHandler}>
          {openTickets === true ? <IoClose /> : <BsChatText className="mb-1" />}
        </button>
      </div>
      {openTickets === true ? (
        <div className="fixed w-[22rem] max-h-[24rem] bottom-[6rem] left-10 bg-white text-black rounded-[18px] overflow-y-scroll">
          <div className="flex items-center justify-center h-[10rem] bg-sky-500 text-white rounded-[18px]">
            <div className="content text-center">
              <div className="title text-[28px]">
                <h1>چت انلاین</h1>
              </div>
              <div className="text text-[12px]">
                لطفا در صورتی که مشکل فنی یا در خصوص پیشیبانی دوره دارید، در بخش
                پرسش پاسخ خود دوره ارسال کنید.
              </div>
            </div>
          </div>

          <div className="overflow-y-scroll">
            {users.tickets.map((ticket) => (
              <p
                className="px-4 my-2 mr-2 w-fit rounded-full bg-sky-300 text-white"
                key={ticket.id}
              >
                {ticket.tickets}
              </p>
            ))}
          </div>

          <div className="editor w-full">
            <input
              name="tickets"
              placeholder="یک پیغام بنویسید..."
              className="w-full h-12 outline-none border-t px-2"
              onChange={handleInputChange}
              onKeyDown={ticketsHandler}
              value={newTickets.tickets}
            ></input>
          </div>
        </div>
      ) : null}
    </>
  );
}
