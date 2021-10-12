
import React, {Component} from "react";
import StyledEngineProvider from '@material-ui/styles/StylesProvider';
import { Box } from "@material-ui/core";
import { Typography } from '@material-ui/core';
import { Modal } from '@material-ui/core';
const style = {
    
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

}

export class LoginModal extends Component {

    render() {
      const {isOpen, toggle} = this.props;

      return (
        <StyledEngineProvider injectFirst>
        <div>
          <Modal
            open={isOpen}
            onClose={toggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                This was hard
              </Typography>
            </Box>
          </Modal>
        </div>
        </StyledEngineProvider>
      );
    }
}

export default LoginModal;



 