<script>
import AUTH from 'src/services/auth'
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: ['data'],
  components: {
    // Line
  },
  mounted() {
    let label = this.data.labels
    let data = this.data.datasets
    this.renderChart({
      labels: label,
      datasets: data
    }, {
      maintainAspectRatio: false
    })
  },
  data(){
    return {
      user: AUTH.user
    }
  }
}
</script>
