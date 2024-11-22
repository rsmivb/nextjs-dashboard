import { Box, Button } from "@mui/material";

export interface IDialogButtonProps{
    onSaveClick: () => void,
    onCancelClick: () => void
}

export default function DialogButtons({ onSaveClick, onCancelClick }: IDialogButtonProps){
    return (
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
            <Button onClick={onSaveClick}>Cancel</Button>
            <Button id="projectTypeSaveButton" variant="contained" onClick={onCancelClick}>Save</Button>
        </Box>
    );
}