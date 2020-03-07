async function createSidebar() {
  var queryStrings = parseQueryStrings();
  let pallet = '';
  let extrinsic = '';
  if (queryStrings['p'] && queryStrings['e']) {
    pallet = queryStrings['p'];
    extrinsic = queryStrings['e'];
  }

  let folders = [
    'polkadot-claims',
    'pallet-benchmark',
    'pallet-balances',
    'pallet-balances-lazy-reaping',
    'pallet-identity',
    'pallet-timestamp',
    'pallet-staking',
    'pallet-vesting',
    'execution'
  ];
  for (folder of folders) {
    let meta = './data/' + folder + '/' + 'meta.json';

    let json = await d3.json(meta);

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
    h6.innerText = folder;

    let ul = document.createElement('ul');
    ul.classList.add('nav', 'flex-column', 'mb-2');

    for (item of json['extrinsics']) {
      let li = document.createElement('li');
      li.classList.add('nav-item');
      let a = document.createElement('a');
      a.classList.add('nav-link');
      if (folder == pallet && item == extrinsic) {
        a.classList.add('active');
      }
      a.href = '?p=' + folder + '&e=' + item;
      a.innerText = item;
      a.onclick = function() {
        parseCsv('./data/' + folder + '/' + this.innerText + '.txt');
      };

      li.appendChild(a);
      ul.appendChild(li);
    }

    sidebar.appendChild(h6);
    sidebar.appendChild(ul);
  }
}

createSidebar().then(() => {
  document.getElementsByClassName('nav-link active')[0].scrollIntoView();
});
