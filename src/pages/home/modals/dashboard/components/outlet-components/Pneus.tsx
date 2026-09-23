
import PneuManagement from './PneuManagement';

function PneusView({ onRegister, onDetails }: { onRegister: () => void; onDetails: (tireId: string) => void }) {
    return <PneuManagement onRegister={onRegister} onDetails={onDetails} />;
}

export default PneusView;
