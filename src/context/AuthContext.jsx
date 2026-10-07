import {
    createContext,
    useContext,
    useMemo,
    useState
} from 'react';

import {
    readStorage,
    writeStorage,
    removeStorage
} from '../utils/localStorage';

const C = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setUser] = useState(() =>
        readStorage('shopsphere_user', null)
    );

    function login({ email }) {
        const u = {
            id: Date.now(),
            name: email.split('@')[0],
            email
        };

        writeStorage('shopsphere_user', u);
        setUser(u);
    }

    function signup({ name, email }) {
        const u = {
            id: Date.now(),
            name,
            email
        };

        writeStorage('shopsphere_user', u);

        setUser(u);
    }

    function logout() {
        removeStorage('shopsphere_user');
        setUser(null);
    }

    return (
        <C.Provider
            value={useMemo(
                () => ({
                    currentUser,
                    isAuthenticated: !!currentUser,
                    login,
                    signup,
                    logout
                }),
                [currentUser]
            )}
        >
            {children}
        </C.Provider>
    );
}

export function useAuth() {
    const c = useContext(C);

    if (!c)
        throw Error(
            'useAuth must be used inside AuthProvider'
        );

    return c;
}