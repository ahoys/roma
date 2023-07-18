import React, { useEffect, useState } from 'react';
import config from 'config';
import { RouteContainer } from '../common/RouteContainer';
import { RouteHeader } from '../common/RouteHeader';
import { RouteList } from '../common/RouteList';
import { useStrings } from 'hooks/hook.useStrings';
import { useList } from 'hooks/hook.useList';
import { useAppSelector } from 'hooks/hook.useAppSelector';
import { UserDTO } from 'dtos/dto.UserDTO';
import { AssignmentDTO } from 'dtos/dto.AssignmentDTO';
import { useWhoAmI } from 'hooks/hook.useWhoAmI';

export const Assignments = () => {
  const [user, setUser] = useState<number | undefined>();
  const whoami = useWhoAmI();
  const str = useStrings();
  const roadmap = useAppSelector((state) => state.data.roadmap);
  const users = useList<UserDTO[]>('users');
  const assignments = useList<AssignmentDTO[]>(
    user === -1
      ? 'assignments?done=false'
      : 'assignments?done=false&user=' + (user || ''),
    !users.isLoading || user !== undefined
  );
  useEffect(() => {
    if (users.data?.length && !user && whoami.user) {
      const me = users.data.find((u) => u._id === whoami.user?._id);
      if (me) {
        setUser(me._id);
      }
    }
  }, [users]);
  return (
    <RouteContainer>
      <RouteHeader value={str.registers.assignments} />
      <RouteList
        baseUrl={`${config.publicPath}r/${roadmap}`}
        dependency={{
          id: 'Assignments:dependency',
          title: str.registers.user,
          options: users.data.map((r) => ({ id: r._id, name: r.name })),
          selected: user,
          canNull: true,
          handleChange: (id) => setUser(id),
        }}
        rows={assignments.data?.map((r) => ({
          id: r._id,
          name: `${r.user?.name}: ${r.feature?.name}`,
          to: `/assignments/${r._id}`,
        }))}
      />
    </RouteContainer>
  );
};
