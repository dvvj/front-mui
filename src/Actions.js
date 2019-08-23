import React from "react";

const Actions = {
    doLogin: (userpass) => {
        let {user, pass} = userpass;
        console.log('in doLogin', user, pass);
    },

    ProfOrg: {
        toProdManagement: () => {
            console.log('in toProdManagement');
        }
    },

    SysAdmin: {
        toProfOrgMgmt: () => {
            console.log('in toProfOrgMgmt');
        }
    }
};

export default Actions;