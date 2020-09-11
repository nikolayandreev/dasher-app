<template>
  <div id="main">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h4>Static Remote Modal (No Cache)</h4>
          <v-modal
            :cache="false"
            :show.sync="showStaticModal"
            title="Общи условия за ползване на софтуер предоставен от Буки ООД"
            fetch="/remote/test.html"
            @close="showStaticModal = false"
          >
          </v-modal>
          <button
            id="show-modal"
            @click="showStaticModal = !showStaticModal"
          >Show static remote</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4>Static Remote Dialog</h4>
          <v-modal
            dialog
            :show.sync="showDialog"
            title="Общи условия за ползване на софтуер предоставен от Буки ООД"
            fetch="/remote/test.html"
            @close="showDialog = false"
          >
          </v-modal>
          <button
            id="show-modal"
            @click="showDialog = !showDialog"
          >Show API modal</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4>Api Remote Modal</h4>
          <v-modal
            :show.sync="showRemoteModal"
            title="Общи условия за ползване на софтуер предоставен от Буки ООД"
            fetchRemote="/api/remote/modal"
            @close="showRemoteModal = false"
          >
          </v-modal>
          <button
            id="show-modal"
            @click="showRemoteModal = !showRemoteModal"
          >Show API modal</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h4>Modal using slots</h4>
          <v-modal
            :show.sync="showSlotModal"
            title="Общи условия за ползване на софтуер предоставен от Буки ООД"
            @close="showSlotModal = false"
          >
            <form>
              <div class="input-group">
                <label class="d-block">First name</label>
                <input
                  type="text"
                  placeholder="Someone's first name"
                />
              </div>
              <div class="input-group">
                <label class="d-block">Last name</label>
                <input
                  type="text"
                  placeholder="Someone's last name"
                />
              </div>
              <div class="input-group">
                <label class="d-block">Email</label>
                <input
                  type="text"
                  placeholder="Someone's email"
                />
              </div>
              <div class="input-group">
                <label class="d-block">Phone</label>
                <input
                  type="text"
                  placeholder="Someone's phone"
                />
              </div>
              <div class="input-group">
                <label class="d-block">Address</label>
                <textarea
                  name="address"
                  id="address"
                  cols="30"
                  rows="5"
                  palceholder="Someone's address"
                ></textarea>
              </div>
            </form>
            <template #actions>
              <v-button
                style="margin-right:10px;"
                @click="showSlotModal = false"
                buttonClass="hover-light-danger font-weight-medium"
                buttonSize="sm"
              >Cancel</v-button>
              <v-button
                @click="showSlotModal = false"
                buttonClass="success font-weight-medium"
                buttonSize="md"
              >Submit</v-button>
            </template>
          </v-modal>
          <button
            id="show-modal"
            @click="showSlotModal = !showSlotModal"
          >Show slow modal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VModal from '~/components/ui/Modal'
import VButton from '~/components/ui/Button'

export default {
  components: {
    VModal,
    VButton,
  },
  data() {
    return {
      showDialog: false,
      showRemoteModal: false,
      showStaticModal: false,
      showSlotModal: false,
    }
  },
}
</script>