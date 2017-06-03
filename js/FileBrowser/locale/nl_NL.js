
if (Ext.ux.FileBrowserPanel) {
    Ext.apply(Ext.ux.FileBrowserPanel.prototype.il8n, {
        displayDateFormat: 'd-m-Y H:i',
        newText: 'Nieuw',
        renameText: 'Hernoemen',
        deleteText: 'Verwijderen',
        uploadText: 'Hoogladen',
        downloadText: 'Neerladen',
        viewsText: 'Weergave',
        detailsText: 'Details',
        thumbnailsText: 'Pictogrammen',
        newFolderText: 'Nieuwe-Map',
        noFilesText: 'Geen bestanden om weer te geven',
        treePanelHeaderText: 'Mappen',
        gridPanelHeaderText: 'Bestanden',
        gridColumnNameHeaderText: 'Naam',
        gridColumnSizeHeaderText: 'Grootte',
        gridColumnTypeHeaderText: 'Type',
        gridColumnDateModifiedText: 'Datum Aangepast',
        extensionChangeTitleText: 'Fout bij wijzigen extentie',
        extensionChangeMsgText: "Kan '{0}' niet hernoemen. De bestands extensie kan niet aangepast worden.",
        confirmDeleteFolderTitleText: 'Bevestig verwijderen map',
        confirmDeleteFolderMsgText: "Weet u zeker dat u de map '{0}' en alle inhoud daarvan wilt verwijderen?",
        confirmDeleteFileTitleText: 'Bevestig verwijderen bestand',
        confirmDeleteFileMsgText: "Weet u zeker dat u '{0}' wilt verwijderen?",
        confirmOverwriteTitleText: 'Bevestig bestand overschijven',
        confirmOverwriteMsgText: 'Eén of meeedere bestanden met dezelfde naam bestaan al in the doelmap. Wilt u deze overschijven?'
    });
    
    Ext.apply(Ext.form.VTypes, {
        filenameText: 'Bestandsnaam is ongeldig of bevat niet-toegestane karakters'
    });
}