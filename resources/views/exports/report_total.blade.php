<table>
    <thead>
        <tr>
            <th>Tanggal</th>
            <th>Kode Ref.</th>
            <th>Nama</th>
            <th>Nominal</th>
            <th>Jenis Transaksi</th>
            <th>Petugas</th>
        </tr>
    </thead>
    <tbody>
        @foreach($reports as $report)
        <tr>
            <td>{{ $report['meta']['date'] }}</td>
            <td>{{ $report['meta']['code'] }}</td>
            <td>{{ $report['user']['name'] }}</td>
            <td>{{ $report['amount'] }}</td>
            <td>{{ $report['type_att'] }}</td>
            <td>{{ $report['meta']['collected_by'] }}</td>

        </tr>
        @endforeach
    </tbody>
</table>