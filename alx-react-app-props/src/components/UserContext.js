import React, { createContext } from 'react'

const UserContext = React.createContext( );



export default UserContext;
const DataContext = React.createContext();

function Grandparent({data}) {
  return (
    <DataContext.Provider value={data}>
      <Parent />
    </DataContext.Provider>
  );
}

function Parent() {
  return <Child />;
}

function Child() {
  const data = useContext(DataContext);
  return <div>{data}</div>;
}