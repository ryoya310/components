import * as React from 'react';

interface Interface {
  SiteName: string
}
export const CommonContext = React.createContext<Interface | null>(null);

export const CommonProvider = (props: any) => {

  const datas: Interface = {
    SiteName: 'parts'
  }

  return <>
    <CommonContext.Provider value={datas}>
      {props.children}
    </CommonContext.Provider>
  </>
}