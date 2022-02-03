<script>
    let formDataTitle = "";
    let formDataDescription = "";
    let formDataPrice = "";

    async function createNFT(event) {
        event.preventDefault();
        const { title, description } = formData;

        console.log("title: " + title);

        const data = new FormData();
        data.append("img", selectedFile);
        data.append("description", description);
        
        if(selectedFile){
            data.append("img", selectedFile);
            console.log("selected file: " + selectedFile);
        }
    }

</script>

<div class="pageCreateNFT">
    <form onSubmit={createNFT}>
      <div class="formHeader">
        <h1>Create collectible</h1>
      </div>
      <div class="content">
        <div class="dropzone">
          <input placeholder="NFT Image" name="file_upload" type="file" />
        </div>
        <fieldset>
            <input placeholder="Title" name="title" type="text" />
        
            <input placeholder="Description" name="description" type="text" />
    
            <input placeholder="Price" name="price" type="text" />

            <button class="btn btn-primary">Submit</button>
        </fieldset>
      </div>
    </form>
  </div>