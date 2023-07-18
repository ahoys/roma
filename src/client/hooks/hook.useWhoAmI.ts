import axios from 'axios';
import config from 'config';
import { useEffect, useState } from 'react';
import { useAppSelector } from './hook.useAppSelector';
import { UserDTO } from 'dtos/dto.UserDTO';
import { useAppDispatch } from './hook.useAppDispatch';
import { removeData, saveData } from 'reducers/reducer.data';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useStrings } from './hook.useStrings';
import { setNotification } from 'reducers/reducer.notifications';

export const useWhoAmI = (): {
  user: UserDTO | undefined;
  authenticatedUsers: UserDTO[];
  unauthenticatedUsers: UserDTO[];
  handleRemoveUser: (id: number) => void;
  handleAuthenticateUser: (id: number) => void;
  handleUnauthenticateUser: (id: number) => void;
} => {
  const dispatch = useAppDispatch();
  const str = useStrings();
  const { isLoggedIn } = useAppSelector((state) => state.session);
  const [ping, setPing] = useState(0);
  const [user, setUser] = useState<UserDTO | undefined>();
  const [authenticatedUsers, setAuthenticatedUsers] = useState<UserDTO[]>([]);
  const [unauthenticatedUsers, setUnauthenticatedUsers] = useState<UserDTO[]>(
    []
  );
  /**
   * Removes the given user.
   * @param id The id of the user to remove.
   */
  const handleRemoveUser = (id: number) => {
    dispatch(
      removeData({
        endpoint: 'users/' + id,
        onSuccess: () => {
          setPing(ping + 1);
          dispatch(
            setNotification({
              id: 'useWhoAmI:handleRemoveUser:success',
              type: 'text',
              icon: faTrash,
              value: str.notifications.removed,
              created: new Date().getTime(),
            })
          );
        },
      })
    );
  };
  /**
   * Authenticates the given user.
   * @param id The id of the user to authenticate.
   */
  const handleAuthenticateUser = (id: number) => {
    dispatch(
      saveData({
        endpoint: 'users/' + id,
        forceUpdate: true,
        data: {
          admin: true,
        },
        onSuccess: () => {
          setPing(ping + 1);
          dispatch(
            setNotification({
              id: 'useWhoAmI:handleAuthenticateUser:success',
              type: 'text',
              icon: faTrash,
              value: str.notifications.authenticated,
              created: new Date().getTime(),
            })
          );
        },
      })
    );
  };
  /**
   * Unauthenticates the given user.
   * @param id The id of the user to unauthenticate.
   */
  const handleUnauthenticateUser = (id: number) => {
    dispatch(
      saveData({
        endpoint: 'users/' + id,
        forceUpdate: true,
        data: {
          admin: false,
        },
        onSuccess: () => {
          setPing(ping + 1);
          dispatch(
            setNotification({
              id: 'useWhoAmI:handleUnauthenticateUser:success',
              type: 'text',
              icon: faTrash,
              value: str.notifications.unauthenticated,
              created: new Date().getTime(),
            })
          );
        },
      })
    );
  };
  useEffect(() => {
    axios
      .get<UserDTO>(config.api + 'whoami')
      .then((response) => {
        if (response?.data) {
          setUser(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get<UserDTO[]>(config.api + 'authenticated')
      .then((response) => {
        if (Array.isArray(response?.data)) {
          setAuthenticatedUsers(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get<UserDTO[]>(config.api + 'unauthenticated')
      .then((response) => {
        if (Array.isArray(response?.data)) {
          setUnauthenticatedUsers(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isLoggedIn, ping]);
  return {
    user,
    authenticatedUsers,
    unauthenticatedUsers,
    handleRemoveUser,
    handleAuthenticateUser,
    handleUnauthenticateUser,
  };
};
