
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

    constructor(props){
      super(props);

      this.state = {
        open: false
      }

      this.toggleModal= this.toggleModal.bind(this);

    }

    toggleModal(){
      this.setState({
        open : !this.state.open
      })
    }

    render() {

      const {open} = this.state;
      return (
        <StyledEngineProvider injectFirst>
        <div>
          <div onClick={this.toggleModal}>Open modal</div>
          <Modal
            open={open}
            onClose={this.toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
            </Box>
          </Modal>
        </div>
        </StyledEngineProvider>
      );
    }
}

export default LoginModal;



 