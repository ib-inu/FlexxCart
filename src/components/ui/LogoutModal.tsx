import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';


type Props = {
    setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>
}


function LogoutModal({ setLogoutModal }: Props) {

    const dispatch = useDispatch();

    const handleClose = () => {
        setLogoutModal(false);
    };
    const onConfirm = () => dispatch(logout());

    return (
        <>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={true}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: "none",
                    outline: "none",
                    ":focus": { outline: "none" }
                }}
            >
                <Sheet
                    sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg', bgcolor: "rgb(230, 230, 230)", color: "#000000" }}
                >
                    <ModalClose variant="plain" sx={{ m: -1 }} onClick={handleClose} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        sx={{ fontWeight: 'lg', mb: 1, width: 200, textAlign: 'center' }}
                    >
                        logout of your account?
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary">
                        <Button
                            color="neutral"
                            sx={{ m: 2, mb: 0 }} onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="danger"
                            disabled={false}
                            loading={false}
                            onClick={onConfirm}
                            variant="solid"
                        >
                            Confirm
                        </Button>
                    </Typography>
                </Sheet>
            </Modal>
        </>
    );
}

export default LogoutModal;
