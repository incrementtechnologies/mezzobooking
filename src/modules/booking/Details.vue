<template>
  <div style="margin: 56px">
    <div><b>Booking Details</b></div>
    <div
      style="
        background-color: white;
        padding: 30px;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <div class="mb-5">
        <span>Booking #:</span>
        <b>{{ reservations.code }}</b>
        <span style="float: right; color: #cbab58"
          >Status:
          <span style="text-transform: capitalize">{{
            reservations.status == 'refunded' ? 'rebooked' : reservations.status
          }}</span></span
        >
      </div>
      <p v-if="errorMessage !== null" style="color: red">
        {{ errorMessage }}<br />
      </p>
      <ul v-if="responseErrors.length > 0">
        <li
          v-for="(each, indx) in responseErrors"
          :key="indx"
          class="text-danger"
        >
          {{ each }}
        </li>
      </ul>
      <div class="row">
        <div class="col-md-6">
          <label>Start Date</label>
          <div class="input-group">
            <input
              type="date"
              v-model="reservations.check_in"
              class="form-control-custom form-control"
              min="valdate"
              :disabled="isDisable || reservations.status === 'cancelled'"
            />
          </div>
        </div>
        <div class="col-md-6">
          <!-- <div> -->
            <label>Number of Adults</label>
            <div class="input-group">
              <input
                type="number"
                v-model="reservations.details.adults"
                min="1"
                class="form-control-custom form-control"
                :disabled="isDisable || reservations.status === 'cancelled'"
              />
              <!-- style="border-right-style: none" -->
              <!-- <span
                style="background: white"
                class="input-group-addon password"
              >
                <i class="fas fa-sync-alt" aria-hidden="true"></i>
              </span> -->
            </div>
          <!-- </div> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label>End Date</label>
          <div class="input-group">
            <input
              type="date"
              v-model="reservations.check_out"
              class="form-control-custom form-control"
              :disabled="isDisable || reservations.status === 'cancelled'"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <label>Number of Children</label>
            <div class="input-group">
              <input
                type="number"
                v-model="reservations.details.child"
                min="0"
                class="form-control-custom form-control"
                :disabled="isDisable || reservations.status === 'cancelled'"
              />
              <!-- style="border-right-style: none" -->
              <!-- <span
                style="background: white"
                class="input-group-addon password"
              >
                <i class="fas fa-sync-alt" aria-hidden="true"></i>
              </span> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label>Additional information(Optional)</label>
          <div class="input-group">
            <textarea
              class="form-control-custom form-control"
              v-model="reservations.details.additionals"
              style="height: 165px !important"
              :disabled="isDisable || reservations.status === 'cancelled'"
            ></textarea>
          </div>
        </div>
        <div class="col-md-6" v-if="reservations.coupon !== null">
          <label>Coupon</label>
          <div class="input-group">
            <input
              type="text"
              v-model="reservations.coupon.code"
              class="form-control-custom form-control"
              style="border-right-style: none"
              :disabled="isDisable"
            />
            <span style="background: white" class="input-group-addon password">
              <i class="fas fa-sync-alt" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div
          class="actionBtns mt-3 ml-auto mr-3"
          :hidden="reservations.status === 'cancelled'"
        >
          <button class="btn btn-primary" @click="updateChange">
            Apply changes
          </button>
        </div>
      </div>
      <b>Payment Methods</b>
      <div v-if="reservations.details.payment_method === 'credit'">
        <i
          class="fa fa-cc-visa"
          style="font-size: 15px; margin-right: 15px"
        ></i>
        <span>***3245 - paid</span>
      </div>
      <div v-if="reservations.details.payment_method === 'checkIn'">
        <i
          class="fas fa-money-bill-wave"
          style="font-size: 15px; margin-right: 15px"
        ></i>
        <span>Payment upon check-in</span>
      </div>
      <div v-if="reservations.details.payment_method === 'bank'">
        <i
          class="fas fa-landmark"
          style="font-size: 15px; margin-right: 15px"
        ></i>
        <span>Bank Transfer</span>
      </div>
      <section class="mt-3">
        <b>Summary</b><br />
        <span class="ml-2">Rooms</span>
        <div class="row ml-4" v-for="(each, idx) in summary" :key="idx">
          <div class="col-md-6">
            <span
              >{{ each.rooms.room_type }}
              <span
                v-if="
                  each.rooms.room_price != 0 &&
                  each.rooms.break_fast != 0
                "
              >
                (with Breakfast)</span
              >
              <span
                v-if="
                  each.rooms.room_price == 0 &&
                  each.rooms.break_fast != 0
                "
              >
                (Breakfast only)</span
              >
              <span
                v-if="
                  each.rooms.room_price != 0 &&
                  each.rooms.break_fast == 0
                "
              >
                (Room only)</span
              >
            </span>
          </div>
          <div class="col-md-6">
            <p>PHP {{ $format.format(each.price_with_number_of_days) }}</p>
          </div>
        </div>
        <div v-if="reservations.coupon !== null">
          <div class="row ml-4">
            <div class="col-md-6">
              <span
                >Discount - {{ reservations.coupon.code }} OFF({{
                  reservations.coupon.amount
                }}{{
                  reservations.coupon.type === "percentage" ? "%" : ""
                }})</span
              >
            </div>
            <div class="col-md-6">
              <p v-if="reservations.coupon.type === 'percentage'">
                {{ reservations.coupon.amount }}%
              </p>
              <p v-else>PHP {{ $format.format(reservations.coupon.amount) }}</p>
            </div>
          </div>
        </div>
        <span class="ml-2" v-if="reservations.details.selectedAddOn.length > 0"
          >AddOns</span
        >
        <div
          class="row ml-4"
          v-for="(each, idx) in reservations.details.selectedAddOn"
          :key="idx"
        >
          <div class="col-md-6">
            <span>{{ each.title }}</span>
            <!-- <i class="fa fa-pencil actionBtn"></i> -->
          </div>
          <div class="col-md-6">
            <p>PHP {{ each.price }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <span style="font-weight: bold; font-size: 16px">Total</span>
          </div>
          <div class="col-md-6">
            <p style="font-weight: bold; font-size: 16px">
              PHP {{ $format.format(reservations.total) }}
            </p>
          </div>
        </div>
      </section>
    </div>
    <section class="mt-3">
      <div><b>Customer Details</b></div>
      <div
        class="row"
        style="
          background-color: white;
          padding: 20px;
          margin-left: auto;
          margin-right: auto;
        "
      >
        <div class="col-md-6">
          <span style="font-size: 12px">Customer ID: {{ customer.id }}</span
          ><br />
          <span style="font-weight: bold; font-size: 16px">{{
            reservations.account_info.name
          }}</span>
          <p style="font-size: 12px">
            {{ reservations.account_info.number_code
            }}{{ reservations.account_info.contactNumber || "N/A" }}
          </p>
        </div>
        <div class="col-md-6" style="padding: 10px 0px">
          <span
            >Email Address: <b>{{ reservations.account_info.email }}</b></span
          >
        </div>
      </div>
    </section>
    <!-- <section>
        <div><b>Room Assigning</b></div>
        <div style="background-color:white; padding: 20px; margin-left:auto; margin-right:auto;">
          <p v-if="emptyAssignment !== null" style="color: red">{{emptyAssignment}}<br></p>
          <div  v-for="(each, idx) in summary" :key="`${each.id}-${idx}`">
            <p>{{each.rooms[0].payload_value}} x {{each.checkoutQty}}</p>
              <div class="row">
              <div class="col-md-6" v-for="(item, indx) in each.inputs" :key="`${indx} - ${item.id}`" >
                  <select class="form-control" v-model="item.category" :disabled="isDisable || reservations.status === 'cancelled'" @change="getSelectedRoom($event)">
                    <option v-for="el in each.specificRooms" :key="el.id" :value="el.id">{{el.title}}</option>
                  </select>
              </div>
            </div>
          </div>
        </div>
      </section> -->
    <section
      class="actionBtns mt-3"
      :hidden="reservations.status === 'cancelled'"
    >
      <div
        class="row"
        style="margin-left: auto; margin-right: auto"
        v-if="
          reservations.status !== 'refunded' ||
          reservations.status !== 'cancelled' ||
          reservations.status !== 'completed'
        "
      >
        <div class="col-md-6 d-flex" style="gap: 2px">
          <button
            class="btn btn-danger footerBtn"
            @click="updateRoom('cancelled')"
            v-if="isDisable === false"
          >
            Cancel
          </button>
          <!-- <button
            class="btn btn-primary footerBtn"
            @click="updateRoom('refunded')"
            v-if="isDisable === false"
          >
            Rebook
          </button> -->
        </div>
        <div class="col-md-6">
          <div style="float: right">
            <button
              class="btn btn-secondary footerBtn"
              @click="validateUpdate('confirmed')"
              v-if="isDisable === false"
            >
              Confirm
            </button>
            <button
              class="btn btn-primary footerBtn"
              @click="updateRoom('completed')"
              v-show="reservations.status === 'confirmed'"
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    </section>
    <section style="margin-left: auto; margin-right: auto">
      <div v-for="(selected, idx) in summary" :key="idx">
        <RoomCard :list="selected.rooms" :page="bookingDetails"/>
      </div>
    </section>
    <Confirmation
      ref="confirmation"
      :message="confirmationMessage"
      title="Warning"
    />
  </div>
</template>

<script>
import RoomCard from "src/modules/generic/RoomCard.vue";
import AUTH from "src/services/auth";
import moment, { max } from "moment";
import Confirmation from "components/increment/generic/modal/Confirmation";
export default {
  components: {
    RoomCard,
    Confirmation,
  },
  mounted() {
    this.retrieve();
  },
  data: () => ({
    user: AUTH.user,
    summary: [],
    addOns: [],
    subTotal: 0,
    total: 0,
    rooms: [],
    coupon: null,
    reservations: null,
    customer: null,
    roomAssign: [],
    assignedRoom: [],
    inputs: [],
    isDisable: false,
    roomAssignError: null,
    errorMessage: null,
    responseErrors: [],
    emptyAssignment: null,
    confirmationMessage: null,
    valdate: new Date()
  }),
  methods: {
    retrieveCoupon() {
      let parameter = {
        account_id: this.user.userID,
        status: "completed",
      };
      this.APIRequest(
        "room_coupon/retrieve_by_reservation",
        parameter,
        (response) => {
          if (response.data !== null) {
            this.coupon = response.data;
          }
        }
      );
    },
    retrieve() {
      let params = {
        id: this.$route.params.id,
      };
      $("#loading").css({ display: "block" });
      this.APIRequest(
        "reservations/retrieve_all_details",
        params,
        (response) => {
          $("#loading").css({ display: "none" });
          if (response.data !== null) {
            this.reservations = response.data.reservation;
            this.customer = response.data.customer;
            this.reservations.check_in = moment(
              new Date(this.reservations.check_in)
            ).format("YYYY-MM-DD");
            this.reservations.check_out = moment(
              new Date(this.reservations.check_out)
            ).format("YYYY-MM-DD");
            this.summary = response.data.cart;
            if (
              this.reservations.status === "confirmed" ||
              this.reservations.status === "completed"
            ) {
              this.isDisable = true;
            } else {
              this.isDisable = false;
            }
            this.retrieveCoupon();
            this.summary.map((el) => {
              for (let index = 0; index < el.qty; index++) {
                let input = {
                  category: null,
                };
                this.inputs.push(input);
              }
            });
          }
        }
      );
    },
    retrieveRooms(category) {
      // this.roomAssign = []
      let params = {
        category_id: category,
      };
      this.APIRequest("rooms/retrieve_by_params", params, (response) => {
        this.roomAssign = response.data;
      });
    },
    updateRoom(status) {
      let temp = [];
      let params = {
        booking: temp,
        roomCode: this.$route.params.id,
        reservation_id: this.reservations.id,
        status: status,
      };
      $("#loading").css({ display: "block" });
      this.APIRequest("reservations/update_reservation", params, (response) => {
        $("#loading").css({ display: "none" });
        this.$router.push("/bookings");
        this.emptyAssignment = null;
      });
    },
    getSelectedRoom(event) {
      let counter = 0;
      this.summary.map((el) => {
        for (let i = 0; i < el.inputs.length; i++) {
          const item = el.inputs[i];
          if (parseInt(item.category) === parseInt(event.target.value)) {
            counter += 1;
          }
        }
      });
      if (counter > 1) {
        this.emptyAssignment =
          "This room is already selected, please select other rooms";
        return;
      } else {
        this.emptyAssignment = null;
        this.errorMessage = null;
      }
    },
    updateChange() {
      let categories = [];
      this.summary.map((el) => {
        categories.push({ category_id: el.category_id });
      });
      let params = {
        reservation_code: this.$route.params.id,
        coupon:
          this.reservations.coupon !== null
            ? this.reservations.coupon.code
            : null,
        check_in: this.reservations.check_in,
        check_out: this.reservations.check_out,
        adults: this.reservations.details.adults,
        children: this.reservations.details.child,
        categories: categories,
        additional: this.reservations.details.additionals,
      };
      $("#loading").css({ display: "block" });
      this.APIRequest("reservations/update_by_admin", params, (response) => {
        $("#loading").css({ display: "none" });
        if (response.error.length > 0) {
          this.responseErrors = response.error;
        } else {
          this.responseErrors = [];
          this.$swal(
            "Success",
            "You have successfully updated the booking.",
            "success"
          );
        }
        this.retrieve();
      });
    },
    validateUpdate(status) {
      let maxCapacity = 0;
      for (let i = 0; i <= this.summary.length - 1; i++) {
        const item = this.summary[i];
        maxCapacity += item.rooms.capacity;
      }
      console.log(parseInt(this.reservations.details.adults), maxCapacity);
      if (parseInt(this.reservations.details.adults) > maxCapacity) {
        this.confirmationMessage =
          "The number of guests are greater then the total max capacity of the reserved category. Are you sure you want to continue?";
        this.$refs.confirmation.show();
      } else {
        this.updateRoom(status);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~assets/style/colors.scss";
.form-control-custom {
  width: 300px !important;
  height: 60px !important;
}
.icon {
  position: absolute;
  margin-left: 100px;
  height: 25px;
  bottom: 17px;
  right: 30px;
  display: flex;
  align-items: center;
}
.icons {
  float: right;
  clear: none;
  margin-right: 2%;
}
.input-group-addon {
  width: 15% !important;
  text-align: center !important;
  padding-bottom: 3px !important;
  display: block !important;
  line-height: 43px !important;
}
.row {
  margin-bottom: 2%;
}
.actionBtn:hover {
  cursor: pointer;
  color: $secondary;
}
.fa-trash {
  color: red;
}
.footerBtn {
  width: 150px;
  height: 50px;
}
</style>
