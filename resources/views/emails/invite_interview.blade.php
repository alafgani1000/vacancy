<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Invite</title>
</head>
<body style="font-family: 'Arial Narrow', Arial, sans-serif">
    <p>
        Kepada Yth.<br/>
        Saudara /i {{ $name }}<br/>
        Di tempat.
    </p>
    <p style="font-weight: normal;">
        Kami mengundang saudara untuk melakukan wawancara kerja pada:
    </p>
    @php
        $date = date_create($date);
        switch (date_format($date, 'N')) {
            case '1':
                $hari = 'Senin';
                break;
            case '2':
                $hari = 'Selasa';
                break;
            case '3':
                $hari = 'Rabu';
                break;
            case '4':
                $hari = 'Kamis';
                break;
            case '5':
                $hari = 'Jumat';
                break;
            case '6':
                $hari = 'Sabtu';
                break;
            default:
                $hari = 'Minggu';
                break;
        }
    @endphp
    <table>
        <tr>
            <td>Hari, Tanggal</td>
            <td>:</td>
            <td>{{ $hari }}, {{  date_format($date, 'd F Y') }}</td>
        </tr>
        <tr>
            <td>Jam</td>
            <td>:</td>
            <td>{{ $time }}</td>
        </tr>
    </table>
    <p>
        Demikian surat panggilan ini dibuat, Atas perhatiannya,<br/>
        Kami ucapkan terima kasih.
    </p>
</body>
</html>
