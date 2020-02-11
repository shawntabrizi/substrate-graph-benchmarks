async function createSidebar() {
  let metas = ['./pallet-balances/meta.json', './pallet-balances-lazy-reaping/meta.json', './pallet-identity/meta.json'];
  for (meta of metas) {
    let json = await d3.json(meta);

    let folder = meta.split('/');

    let sidebar = document.getElementById('sidebar');
    let h6 = document.createElement('h6');
    h6.classList.add(
      'sidebar-heading',
      'd-flex',
      'justify-content-between',
      'align-items-center',
      'px-3',
      'mt-4',
      'mb-1',
      'text-muted'
    );
    h6.innerText = folder[1];

    let ul = document.createElement('ul');
    ul.classList.add('nav', 'flex-column', 'mb-2');

    for (item of json['extrinsics']) {
      let li = document.createElement('li');
      li.classList.add('nav-item');
      let a = document.createElement('a');
      a.classList.add('nav-link');
      a.href = '?p=' + folder[1] + '&e=' + item;
      a.innerText = item;
      a.onclick = function() {
        parseCsv('./' + folder[1] + '/' + this.innerText + '.txt');
      };

      li.appendChild(a);
      ul.appendChild(li);
    }

    sidebar.appendChild(h6);
    sidebar.appendChild(ul);
  }
}

createSidebar();
