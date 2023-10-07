import { observer } from "mobx-react-lite";
import { Box, Modal } from "@mui/material";
import { useStore } from "../../stores/store";


export default observer(function ModalContainer() {
    const {modalStore} = useStore();
    return (
        <Modal 
            open={modalStore.modal.open} 
            onClose={modalStore.closeModal} 
            style={{ backdropFilter: "blur(5px)" }} >
            <Box sx={{  
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: 1,
                        boxShadow: 24,
                        width: 800,
                        justifyContent: 'center',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        borderRadius: '16px',
                        }}>
             {modalStore.modal.body}
            </Box>    
        </Modal>
    )
})