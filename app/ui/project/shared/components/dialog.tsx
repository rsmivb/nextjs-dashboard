import { Box, Popper, Stack } from "@mui/material";
import DialogButtons, { IDialogButtonProps } from "./dialogButtons";

export interface IDialogProps{
    id: string,
    label: string,
    anchorEl?: HTMLElement,
    children: React.ReactNode,
    buttonFunctions: IDialogButtonProps
}

export default function Dialog(props: IDialogProps){
    const open = Boolean(props.anchorEl);

    return (
        <Popper id={props.id} open={open} anchorEl={props?.anchorEl} sx={{ zIndex: 1200 }} placement='right'>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', marginLeft: '2em' }}>
                <Stack spacing={2}>
                    {props.children}
                    <DialogButtons onSaveClick={props.buttonFunctions.onSaveClick} onCancelClick={props.buttonFunctions.onCancelClick}/>
                </Stack>
            </Box>
          </Popper>
    );
}