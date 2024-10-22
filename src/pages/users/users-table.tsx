"use client";
import { Cross2Icon } from "@radix-ui/react-icons";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isValidEmail, useDebounce } from "@/lib/utils";
import { useUsers } from "@/services/use-users";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "@/schemas/user";
import { SearchInput } from "@/components/ui/SearchInput";
import { LoadingSpiner } from "@/components/ui/LoadingSpiner";
import { UserDetails } from "@/components/ui/UserDetails";
import { AddUserInfo } from "@/components/ui/AddUserModal";

export const UsersTable = () => {
  const [results, setResults] = useState<User[]>([]);
  const [text, setText] = useState<string>("");
  const debouncedValue = useDebounce(text, 300);
  const [loadingResults, setLoadingResults] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<null | {
    id: number;
    name: string;
    username: string;
    email: string;
  }>(null);
  const [addUser, setAddUser] = useState<boolean>(false);

  const { users, loading, error, setUser } = useUsers();

  const noResults = useMemo(() => {
    return text.trim().length && !results.length && !loadingResults;
  }, [text, results, loadingResults]);

  const handleSearch = useCallback(
    (text: string) => {
      if (text.trim().length) {
        if (isValidEmail(text)) {
          const data = users.filter((u) =>
            u.email.toLowerCase().includes(text.toLowerCase())
          );
          setResults(data);
        } else {
          const data = users.filter((u) =>
            u.name.toLowerCase().includes(text.toLowerCase())
          );
          setResults(data);
        }
      } else {
        setResults([]);
      }
      setLoadingResults(false);
    },
    [users]
  );

  const handleClear = () => {
    setText("");
    setResults([]);
  };

  const handleSearchChange = useCallback((text: string) => {
    setLoadingResults(true);
    setText(text);
  }, []);

  useEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue]);

  if (loading) {
    return <LoadingSpiner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const openModal = (
    user: { id: number; name: string; username: string; email: string } | null
  ) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const openAddUserModal = () => {
    setAddUser(true);
  };

  const closeAddUserModal = () => {
    setAddUser(false);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <SearchInput
            handleClear={handleClear}
            handleSearchChange={handleSearchChange}
            text={text}
          />
        </div>

        <div>
          <button
            onClick={openAddUserModal}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Add User
          </button>
        </div>
      </div>

      {noResults ? <p className="mt-2">No users found</p> : null}
      {loadingResults && <LoadingSpiner />}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption className="text-lg font-medium  mb-4">
            A list of users.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {text
              ? results.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))
              : users.map((user) => (
                  <TableRow key={user.id} onClick={() => openModal(user)}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {isOpen && (
        <UserDetails selectedUser={selectedUser} closeModal={closeModal} />
      )}
      {addUser && (
        <AddUserInfo closeModal={closeAddUserModal} addUser={setUser} />
      )}
    </>
  );
};
