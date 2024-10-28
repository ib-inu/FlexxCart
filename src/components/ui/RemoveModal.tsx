import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useDispatch } from 'react-redux';
import { setRemoveModal } from '../../features/cart/cartSlice';

interface RemoveModalProps {
    text: string,
    onConfirm: () => void,
}

function RemoveModal({ onConfirm, text }: RemoveModalProps) {

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setRemoveModal({ modal: false, selectedItemId: 0 }));;
    };

    return (
        <>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={true}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
                        sx={{
                            fontWeight: 'lg', mb: 1, transform: "translate(16px)",
                            border: "none",
                            outline: "none",
                            ":focus": { outline: "none" }
                        }}
                    >
                        {text}
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

export default RemoveModal;
