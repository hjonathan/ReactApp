const actions = {
    caseNotes: {
        request: x => x,
        success: notes => ({notes}),
        error: error => ({error})
    },
    postCaseNote: {
        request: x => x,
        success: status => (status),
        error: error => ({error})
    },
    notesUsers: {
        request: x => x,
        success: status => (status),
        error: error => ({error})
    }
};

export default actions;
