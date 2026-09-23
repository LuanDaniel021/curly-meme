
import { useState } from "react";
import Dashboard from "./modals/dashboard/Dashboard";
import Profile from "./modals/profile/Profile";

function Home() {

    const [modalAtivo, setModalAtivo] = useState('dashboard');

    const handler = () => {
        switch (modalAtivo) {
            case 'profile': return <Profile
                setModalAtivo={() => setModalAtivo('dashboard')}
            />
            default : return <Dashboard
                setModalAtivo={() => setModalAtivo('profile')}
            />
        }
    }

    return (
        handler()
    )
}

export default Home;