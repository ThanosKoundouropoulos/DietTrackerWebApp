import { observer } from "mobx-react-lite";

import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default observer(function ModalContainer() {
    const {modalStore} = useStore();
    return (
        <Modal open={modalStore.modal.open} onClose={modalStore.closeModal} size="large" style={{width:"450px",height:"300px", backgroundColor:"#233142"  }}>
                {modalStore.modal.body}
        </Modal>
    )
})