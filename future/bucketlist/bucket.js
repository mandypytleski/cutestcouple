const supabaseUrl = "https://mboddoezgkpmzqnwypcs.supabase.co";
const supabaseKey = "sb_publishable_4RRfiDAs6WR5ei269O6sbg_FqHGIt95";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", loadItems);

async function loadItems() {
  const { data, error } = await supabaseClient
    .from("bucket_list")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("bucket-list");
  container.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "col-md-6 col-lg-4";

    div.innerHTML = `
      <div class="bucket-card ${item.completed ? 'completed' : ''}">
        
        <p class="bucket-text">
          ${item.item}
        </p>

        <div class="d-flex align-items-center gap-2">

          <!-- Check button -->
          <button class="check-btn" onclick="toggleComplete(${item.id}, ${item.completed})">
            <span class="check-circle ${item.completed ? 'checked' : ''}"></span>
          </button>

          <!-- Delete button -->
          <button class="delete-btn" onclick="deleteItem(${item.id})">
            ×
          </button>

        </div>

      </div>
    `;

    container.appendChild(div);
  });
}

async function addItem() {
  const input = document.getElementById("bucketInput");
  const value = input.value.trim();

  if (!value) return;

  const { error } = await supabaseClient
    .from("bucket_list")
    .insert([{ item: value, completed: false }]);

  if (error) {
    console.error(error);
    return;
  }

  input.value = "";
  loadItems();

}

// ✅ Toggle complete
async function toggleComplete(id, currentStatus) {
  const { error } = await supabaseClient
    .from("bucket_list")
    .update({ completed: !currentStatus })
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }


  loadItems();
  if (typeof confetti === "function") {
    confetti();
  }
}

// ❌ Delete item
async function deleteItem(id) {
  const { error } = await supabaseClient
    .from("bucket_list")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  loadItems();
}